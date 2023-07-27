
const deleteProducto= document.querySelectorAll('.deleteProducto')


deleteProducto.forEach(producto => {
    producto.addEventListener('click', (e)=>{
        const pid = e.target.dataset.productId;
    
        const data={
            pid:pid
        }

        fetch("/api/cart/deleteproduct",{
            method:'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response)=>{
            response.json()
            console.log("Fué borrado", response)
        })
        .catch(error => {
            console.error('Error al eliminar', error);
        });
       

    });
});

