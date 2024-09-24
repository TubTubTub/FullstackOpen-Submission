import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ show, setError, setToken, setPage }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            setPage("books")
            console.log('set token:', token)
        }
    }, [result.data, setToken])

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    if (!show) return null

    return (
        <div>
            <form onSubmit={submit}>
                username<input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
                password<input type="text" value={password} onChange={({ target} ) => setPassword(target.value)}/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm