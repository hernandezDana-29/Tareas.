import express from 'express'; 

const server = express();
server.use(express.json());

server.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;

let tareas = [
  {titulo: "matematicas", descripcion: 'sumas', estado:"Pendiente", pasos:"saber que 1 + 1 = 3" }, 
  {titulo: "castellano", descripcion: 'leer libros', estado:"completada", pasos:"tener libro" },
  {titulo: "dibujo", descripcion: 'manga', estado:"en proceso", pasos:"salir de latinoamerica"  },
  {titulo: "Hacer el mercado", descripcion: 'Comprar lo que este en la lista', estado:"Pendiente", pasos:"Primero debo tomar la buseta y luego ir a la plaza de mercado"  },
];

server.get('/tareas', (req, res) => {
  res.status(200).json(tareas);

});


server.get('/tareas/pendientes', (req, res) => {
    const tareasPendientes = tareas.filter(tarea => tarea.estado === 'Pendiente');
    res.json(tareasPendientes);
});


server.get('/tareas/Completadas', (req, res) => {
const tareasCompletadas = tareas.filter(tarea => tarea.estado === 'completada');
  res.json(tareasCompletadas);
});


server.post('/tareas', (req, res) => {
  const { titulo, descripcion, estado, pasos } = req.body;

  if (!titulo || !descripcion || !estado || !pasos) {
    return res.status(400).json({ mensaje: 'El título, la descripción, el estado y los pasos son obligatorios.' });
  }

  const nuevaTarea = {
   
    titulo,
    descripcion,
    estado,
    pasos
  };

  tareas.push(nuevaTarea);
 return res.status(201).json({ mensaje: 'Tarea creada con éxito', tarea: nuevaTarea });
});


server.patch('/tareas/:titulo', (req, res) => {
    const tarea = tareas.find(t => t.titulo.toLowerCase().trim() === req.params.titulo.toLowerCase().trim());
    
    if (!tarea) return res.status(404).json({ mensaje: 'No encontrada' });

   
    Object.assign(tarea, req.body);
    
    res.json({ mensaje: 'Actualizada', tarea });
});




server.get('/tareas/:titulo', (req, res) => {
   const titulo = String(req.params.titulo);
  const tarea = tareas.find((a) => a.titulo === titulo);

   if (!tarea) {
    return res.status(404).json({ mensaje: `No existe la tarea` });
  }

  res.status(200).json({  
    titulo: tarea.titulo,
    Descripcion: tarea.descripcion,
    estado: tarea.estado,
    pasos: tarea.pasos
  });

});

server.delete('/tareas/:titulo', (req, res) => {
  const titulo = String(req.params.titulo);
  const index = tareas.findIndex(p => p.titulo === titulo);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'No existe la tarea que deseas eliminar.' });
  }

  const tareaEliminada = tareas.splice(index, 1);
  res.status(200).json({ 
    mensaje: 'Tarea eliminada correctamente.', 
    tareas: tareaEliminada[0] 
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});