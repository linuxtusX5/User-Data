import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Login = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const {data} = await axios.post('http://localhost:8080/api/v1/user/auth/login', {
            email: inputs.email, password: inputs.password
        })
        if(data.success){
            navigate('/home');
        }
    } catch (error) {
        console.log(error)
    }
}
return (
    <>
    <div className='container'>
        <Form onSubmit={handleSubmit}>
            <h2 style={{color: '#fff', fontWeight: 'bold', textTransform: 'uppercase'}}>Welcome to User</h2>
            <Form.Group controlId='form.cont2'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' onChange={handleChange} name='email' value={inputs.email} placeholder='Email'/>
            </Form.Group>
            <Form.Group controlId='form.cont3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' onChange={handleChange} name='password' value={inputs.password} placeholder='Password'/>
            </Form.Group>
            <Button type='submit' style={{marginTop: '20px'}}>Login</Button>
            <div>
                <Link to={'/'} style={{marginTop: '20px', color: '#fff', textDecoration: 'none'}}>Don't have an account? Register</Link>
            </div>
        </Form>
    </div>
    </>
)
}

export default Login