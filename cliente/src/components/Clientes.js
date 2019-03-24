//Para el from
import React, { Fragment } from 'react';
//Para la query
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

//importa la consulta de clientes
import { CLIENTES_QUERY } from '../queries';

//vamos a hacer un listado de los contactos que tenemos en base de datos
//usaremos react-apollo con sus querys y mutations
const Contactos = () => (
	// pollInterval define cada cuanto se va a refrescar en milisegundos, en los argumentos se le agrega dos opciones más startpollin y stoppolling
	<Query query={CLIENTES_QUERY} pollInterval={1000}>
		{/* (se pueden pasar mas) loading mensaje mientras carga el código, error es el mensaje en caso de error y data serán los datos */}
		{({ loading, error, data, startPolling, stopPolling }) => {
			if (loading) return 'Cargando...';
			// Usamos un template string porque queremos usar una variable
			if (error) return `Error: ${error.message}`;
			console.log(data.getClientes);
			//una query tiene que devolver algo
			return (
				<Fragment>
					<h2 className="text-center"> Listado de Clientes </h2>
					<ul className="list-group">
						{/* indicamos que es un código de react con las llaves*/}
						{data.getClientes.map((item) => (
							<li key={item.id} className="list-group-item">
								<div className="row justify-content-between align-items-center">
									<div className="col-md-8 d-fex justify-content-between align-items-center">
										{item.nombre} {item.apellido} - {item.empresa}
									</div>
									<div className="col-md-4 d-flex justify-content-end">
										{/* con el signo dolar estamos refiriendonos al id del elemento item que está en el dom */}
										<Link
											to={`/cliente/editar/${item.id}`}
											className="btn btn-success d-block d-md-inline-block"
										>
											Editar Cliente
										</Link>
									</div>
								</div>
							</li>
						))}
					</ul>
				</Fragment>
			);
		}}
	</Query>
);

export default Contactos;
