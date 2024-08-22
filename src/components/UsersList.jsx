import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../redux/usersSlice";

const UsersList =() => {
    // extraer la lista de usuarios del estado global
    const users = useSelector((state)=> state.users);
    // obtiene la accion dispatch que se usar para despachar la accion fetchUsers
    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>{console.log(res);
            dispatch(fetchUsers(res.data));
        })
        .catch(err=>console.log(err))
    }, [dispatch])

    return (
        <>
        <h2>Lista de usuarios</h2>
        {console.log(users)}
        <ul>
            {users.map(user=>(<li key={user.id}>{user.name}</li>))}
        </ul>
        </>
    )
}

export default UsersList;