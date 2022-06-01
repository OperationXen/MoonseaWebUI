import {Button, Typography} from "react"

import userState from "../../datastore/user"

export default function ProfileWidget(){
  const [username] = userState(s => s.username)
	
	return(
		<Button>
			<Typography>{username}</Typography>
		</Button>
	);
}