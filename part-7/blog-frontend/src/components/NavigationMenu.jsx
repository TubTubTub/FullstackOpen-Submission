import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import UserInfo from './UserInfo'

const NavigationMenu = () => {
    const location = useLocation()

    const padding = {
      padding: 5
    }

    const navigationStyle = {
        backgroundColor: 'lightgray',
        padding: '5px'
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                    <Nav.Link href='#' as="span">
                        <span style={padding}>{ location.pathname !== '/blogs' ? <Link to="/blogs">blogs</Link> : 'blogs' }</span>
                    </Nav.Link>

                    <Nav.Link href='#' as="span">
                        <span style={padding}>{ location.pathname !== '/users' ? <Link to="/users">users</Link> : 'users' }</span>
                    </Nav.Link>

                    <Nav.Link href='#' as="span">
                        <UserInfo style={padding} />
                    </Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationMenu