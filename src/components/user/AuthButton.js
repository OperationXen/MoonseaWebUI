import {Button} from "@mui/material";
import {Routes, Route} from "react-router-dom";

export default function AuthButton() {
	return (
		<Routes>
			<Route path='/register' element={(<Button>Login</Button>)}/>
			<Route path='/login' element={(<Button>Register</Button>)}/>
		</Routes>
	)		
}
