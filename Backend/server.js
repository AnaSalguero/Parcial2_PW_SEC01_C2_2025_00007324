const express = require('express');
const app = express();
const PORT = 3130;

app.use(express.json());

//Añadimos 7 cuentas para comprobaciones 
const cuentas = [
    {
    "_id": "68f97efd06b70b9ae900abe7",
    "isActive": false,
    "balance": "$1,268.94",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "name": "Collins Benton",
    "gender": "male"
  },
  {
    "_id": "68f97efd5bd3279c12be54f6",
    "isActive": true,
    "balance": "$2,110.38",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "name": "Socorro Osborne",
    "gender": "female"
  },
  {
    "_id": "68f97efdc22aea07d091e070",
    "isActive": false,
    "balance": "$3,589.82",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "name": "Alicia Ruiz",
    "gender": "female"
  },
  {
    "_id": "68f97efdd6fb03c82eeaca1e",
    "isActive": false,
    "balance": "$3,293.59",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "name": "Staci Fox",
    "gender": "female"
  },
  {
    "_id": "68f97efdefdd6e6367f4cc49",
    "isActive": true,
    "balance": "$2,556.76",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "name": "Dominique Daniels",
    "gender": "female"
  },
  {
    "_id": "68f97efd131ac444264042c5",
    "isActive": false,
    "balance": "$3,904.82",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "name": "Haney York",
    "gender": "male"
  },
  {
    "_id": "68f97efd4147c0946b7e696f",
    "isActive": false,
    "balance": "$2,270.95",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "name": "Willa Park",
    "gender": "female"
  }
]

//Muestra todas las cuentas y la cantidad.
//app.get es nativo de Express.
app.get('/cuentas', (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
});

//Muestra a una cuenta en base al id ingresado en la URL.
app.get('/cuentas/:id', (req, res) => {
  const id = req.params.id;
  //busca una cuenta que coincida con el id ingresado
  const cuenta = cuentas.find(c => c._id === id);

  res.json({
    //verifica si la cuenta existe y almacena un booleano.
    finded: !!cuenta,
    //Almacena la cuenta o si no existe almacena un NULL.
    account: cuenta || null
  });
});

//Pasar parametro ya sea genero, nombre o id.
app.get('/cuenta', (req, res) => {
  //Almacena en la query el parametro redactado en la URL.
  const query = (req.query.queryParam || "").toLowerCase();
  
  let resultado;
  
  //Se filtran los datos de las cuentas buscando coincidencia con el nombre, genero o id.
  resultado = cuentas.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.gender.toLowerCase() === query ||
    c._id.toLowerCase() === query
  );

  //Comprueba la existencia de la cuenta y su cantidad, en base a eso el servidor devuelve una respuesta.
  if (resultado.length === 0) {
    res.json({ finded: false, account: null });
  } else if (resultado.length === 1) {
    res.json({ finded: true, account: resultado[0] });
  } else {
    res.json({ finded: true, data: resultado });
  }
});

//Muestra el total del balance ded todas las cuentas activas
app.get('/cuentasBalance', (req, res)=>{
    //Almacena los datos solamente de las cuentas activas
    const Active = cuentas.filter(c => c.isActive);
    
    //Evalua si almenos una cuenta esta activa
    if(Active.length===0){
        res.json({status:false});
    }else{
        //Almacena el total de los balances de las cuentas activas
        const total = Active.reduce((sum, c) => {
            //Convierte el valor de balance de cada cuenta en un flotante
            const balanceNum = parseFloat(c.balance.replace(/[$,]/g, ''));
            return sum + balanceNum;
        }, 0);       
        res.json({
            status:true, 
            accountBalance: total
        });
    }
    
});

//Muestra en la terminal la URL para ingresar al servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});