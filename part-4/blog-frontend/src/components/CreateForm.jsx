import { useState } from 'react'

const CreateForm = ({ createNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = (event) => {
      event.preventDefault()
      createNewBlog({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')
    }

    return (
      <form onSubmit={handleNewBlog}>
        <div>
          title: <input type="text" name="Title" value={title} onChange={ ({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input type="text" name="Author" value={author} onChange={ ({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url: <input type="text" name="Url" value={url} onChange={ ({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    )
}

export default CreateForm