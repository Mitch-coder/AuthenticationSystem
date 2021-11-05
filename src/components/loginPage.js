import React from 'react';

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        }
    }
    handleUserNameChange = (event) =>{
        this.setState({
            username:event.target.value,
        })
    }
    handlePasswordChange = (event) =>{
        this.setState({
            password:event.target.value,
        })
    }
    handleSubmit = async event=>{
       event.preventDefault()
      const form = new FormData(event.target)
      try {
         let config={
             method:'POST',
             body:form
         } 
         let res = await fetch('http://127.0.0.1:5000/login',config)
         let json = await res.json()
         console.log(json.success,json.token)
         if (json.success===true) {
            window.location.href = '/profile'
          }else{
            window.location.href = '/login'
          }
      } catch (error) {
      }
      
    }
  render(){
    return(
        <div>
            <br/>
            <br/>
            <div className="p-10">
                <h2 className="text-center  text-3xl leading-9 font-extrabold text-white-800">
                    Ingrese sus credenciales
                </h2>
                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <div className="flex justify-center">
                        <div className="lg:w-2/3 md:w-1/3 w-full">
                            <label className="tracking-wide text-green-200 text-xs font-bold mb-2" htmlFor="username">
                                Usuario
                            </label>
                            <input
                             type="username" 
                             value={this.state.username} onChange={this.handleUserNameChange}
                             name="username"
                             id="username" 
                             placeholder="Ingrese su usuario"
                             className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-200"
                             required
                             >
                            </input>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="lg:w-2/3 md:w-1/3 w-full">
                            <label className="tracking-wide text-green-200 text-xs font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                             type="password" 
                             value={this.state.password} onChange={this.handlePasswordChange}
                             name="password"
                             id="password" 
                             placeholder="****"
                             className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-200"
                             required
                             >
                            </input>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                            <button
                                type="submit"
                                className="bg-green-500 group w-full lg:w-2/3 md:w-1/3 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white hover:bg-teal-400 focus:outline-none focus:border-teal-400 focus:shadow-outline-teal activate:bg-teal-400 activate:outline-none transition duration-150 ease-in-out"
                            > Log in </button>
                        </div>
                </form>
            </div>
        </div>

    );
  }
}

export default LoginPage