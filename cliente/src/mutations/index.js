import gql from 'graphql-tag';

export const NUEVO_CLIENTE_MUTATION = gql`
	mutation crearCliente($input: ClienteInput) {
		crearCliente(input: $input) {
			id
			nombre
			apellido
		}
	}
`;

export const ACTUALIZAR_CLIENTE_MUTATION = gql`
	mutation actualizarCliente($input: ClienteInput) {
		actualizarCliente(input: $input) {
			id
			nombre
			apellido
			edad
			empresa
			tipo
			emails {
				cuentaEmail
			}
		}
	}
`;
