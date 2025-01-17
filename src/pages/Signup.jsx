import React from 'react'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../../public/assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../../public/assets/svg/visibilityIcon.svg'
import { getAuth , createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
import  { db } from '../firebase.config'
import { setDoc , doc , serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

const Signup = () => {
    const [showPassword , setShowPassword] = useState(false)
    const [formData , setFormData] = useState({
        name :'',
        email:'',
        password:'',
        
    })
    const { name,  email , password } = formData
    const navigate = useNavigate()
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,

        }))
        
    }
    console.log(formData)
    const onSubmit = async (e) =>{
        e.preventDefault()

        try{
            const auth =getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth , email , password)
            const user = userCredential.user
            console.log(user)
            updateProfile(auth.currentUser , {
                displayName : name
            })

        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db , 'users' , user.uid) , formDataCopy)
            navigate('/')
        }
        
        catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            toast.error('Something Went Wrong')
        }

    }  
    return (
    <div className='pageContainer'>
        <header>
            <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
        <input type='text'
            className='nameInput'
            placeholder='Name'
            id = 'name'
            value={name}
            onChange={onChange}/>
            <input type='email'
            className='emailInput'
            placeholder='Email'
            id = 'email'
            value={email}
            onChange={onChange}/>
            <div className='passwordInputDiv border-1 border'>
                <input type={showPassword? 'text' : 'password' }
                className='passwordInput' placeholder="Password"
                id="password" value={password} onChange={onChange} />
                <img src={visibilityIcon} 
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState)=> !prevState)}/>
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password </Link>
            <div className='signInBar'>
                <p className='signInText'> Sign Up</p>
                <button className='bg-black'> 
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
                </button>
            </div>
        </form>
        <OAuth/>
        <Link to='/signin' className='registerup'>Sign In Instead</Link>
    </div>
  )
}

export default Signup