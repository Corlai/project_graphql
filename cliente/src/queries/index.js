//Para verlo mejor es necesario del paquete graphql-tag
import gql from 'graphql-tag';

//Archivo para exportar queries, antes probarlo en las consultas en el playground
//Esta es la forma en que se escribe un query o un mutation
export const CLIENTES_QUERY = gql`
	{
		getClientes {
			id
			nombre
			apellido
			empresa
		}
	}
`;

export const CLIENTE_QUERY = gql`
	query consultarCliente($id: ID) {
		getCliente(id: $id) {
			id
			nombre
			apellido
			empresa
			edad
			tipo
			emails {
				cuentaEmail
			}
		}
	}
`;
