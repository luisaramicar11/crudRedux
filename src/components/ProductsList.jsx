import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, readProducts, updateProduct } from "../redux/productsSlice";

const ProductsList = () => {
    const products = useSelector(state=>state.products);
    const dispatch = useDispatch(); // hace el cambio del estado

    const [newProductName, setNewProductName] =useState("")
    const [editedProduct, setEditedProduct] =useState(null)

    useEffect(()=>{axios
        .get("http://localhost:3001/products")
        .then(response=>{console.log(response);
        dispatch(readProducts(response.data))})
        .catch(error=>console.error(error))
    }, [dispatch]);

    const handleCreateProduct = () => {
        if(newProductName){
            const newProduct = {id:Date.now(), name: newProductName};
            dispatch(createProduct(newProduct))

            axios.post("http://localhost:3001/products", newProduct)
            .then(response=>{
                console.log(response);
                setNewProductName("")
            })
            .catch(error=>console.error(error))
        }
    }

    const handleUpdateProduct = () => {
        if(editedProduct){
            dispatch(updateProduct({id:editedProduct.id, name: editedProduct.name}))
            axios.put(`http://localhost:3001/products/${editedProduct.id}`,{
                name: editedProduct.name,
            })
           .then(response=>{
                console.log(response);
                setEditedProduct(null)
            })
           .catch(error=>console.error(error))
        }
    }

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id))
        axios.delete(`http://localhost:3001/products/${id}`)
       .catch(error=>console.error(error))
    };

  return (
    <>
    <h2>Crud de productos</h2>
    <h3>Lista de productos</h3>
    <ul>
        {products.data.map((product)=>(
            <li key={product.id}>
                {editedProduct?.id === product.id ? (<div>
                    <input type="text" value={editedProduct.name} onChange={e=>setEditedProduct({...editedProduct, name:e.target.value})}/>
                    <button onClick={handleUpdateProduct}>Actualizar</button>
                </div>):( <div>
                <span>{product.name}</span>
                <button onClick={()=>setEditedProduct(product)}>Editar</button>
                <button onClick={()=>handleDeleteProduct(product.id)}>Eliminar</button>
            </div>)}
            </li>))}
    </ul>
    <aside>
        <input type="text" value={newProductName} onChange={(e)=>setNewProductName(e.target.value)}/>
        <button onClick={handleCreateProduct}>Agregar producto</button>
    </aside>
    </>
  )
}

export default ProductsList;