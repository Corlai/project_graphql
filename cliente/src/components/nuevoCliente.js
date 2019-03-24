import React, { Component, Fragment } from 'react';

// importamos el mutation para poder conectarlo con el backend
import { Mutation } from 'react-apollo';
import { NUEVO_CLIENTE_MUTATION } from '../mutations';

export class NuevoCliente extends Component {
	state = {
		cliente: {
			nombre: '',
			apellido: '',
			empresa: '',
			edad: '',
			tipo: ''
		},
		error: false,
		emails: []
	};
	nuevoCampo = () => {
		this.setState({
			// ([{}])-> () por parametros de concat, [] porque es un arreglo y {} porque es un objeto
			emails: this.state.emails.concat([ { cuentaEmail: '' } ])
		});
	};
	quitarCampo = (i) => () => {
		this.setState({
			// muestra todos menos el índice que le paso
			emails: this.state.emails.filter((cuentaEmail, index) => i !== index)
		});
	};
	// le pasamos el indice = i y el evento
	leerCampo = (i) => (e) => {
		const nuevoEmail = this.state.emails.map((cuentaEmail, index) => {
			// si no es el indice que le paso no hace nada, si es el indice i
			if (i !== index) return cuentaEmail;
			return {
				...cuentaEmail,
				cuentaEmail: e.target.value
			};
		});
		this.setState({
			emails: nuevoEmail
		});
	};

	render() {
		const { error } = this.state;
		let respuesta = error ? (
			// operador ternario
			<p className="alert alert-danger pp-3 text-center"> Todos los campos son OBLIGATORIOS</p>
		) : (
			''
		);
		return (
			<Fragment>
				<h2 className="text-center">Nuevo Cliente</h2>
				{/* lo ponemos entre llaves para indicar que es una variable de javascript */}
				{respuesta}
				<div className="row justify-content-center">
					{/* ponemos aqui el mutation del formulario */}
					<Mutation
						mutation={NUEVO_CLIENTE_MUTATION}
						//de la documentación de apollo
						onCompleted={() => this.props.history.push('/')}
					>
						{(crearCliente) => (
							<form
								className="col-md-8 m-3"
								onSubmit={(e) => {
									e.preventDefault();
									// esto lo traemos del state
									const { nombre, apellido, empresa, edad, tipo } = this.state.cliente;
									const { emails } = this.state;

									if (
										nombre === '' ||
										apellido === '' ||
										empresa === '' ||
										edad === '' ||
										tipo === ''
									) {
										this.setState({
											error: true
										});
										return;
									}
									this.setState({
										error: false
									});
									const input = {
										//nombre: nombre ->el primero es de lo que espera el mutation y el segundo es lo que se le da pero con las
										//ultimas caracteristicas de javascript, si lo que espera  lo que se ingresa es lo mismo basta con poner un solo nombre
										nombre,
										apellido,
										empresa,
										edad: Number(edad), //como edad en graphql es un int, no podemos pasarlo como si fuera un string. Usamos number para convertirlo y mandarlo a graphql sin error
										tipo,
										emails
									};
									crearCliente({
										variables: { input }
									});
								}}
							>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label>Nombre</label>
										<input
											type="text"
											className="form-control"
											placeholder="Nombre"
											onChange={(e) => {
												this.setState({
													cliente: {
														// para que no me quite otras propiedades es con el state operator
														//así el resto del state no se ve afectado
														...this.state.cliente,
														nombre: e.target.value
													}
												});
											}}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>Apellido</label>
										<input
											type="text"
											className="form-control"
											placeholder="Apellido"
											onChange={(e) => {
												this.setState({
													cliente: {
														...this.state.cliente,
														apellido: e.target.value
													}
												});
											}}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<label>Empresa</label>
										<input
											type="text"
											className="form-control"
											placeholder="Empresa"
											onChange={(e) => {
												this.setState({
													cliente: {
														...this.state.cliente,
														empresa: e.target.value
													}
												});
											}}
										/>
									</div>
									{this.state.emails.map((input, index) => (
										<div key={index} className="form-group col-md-12">
											<label>Correo: {index + 1}: </label>
											<div className="input-group">
												<input
													// en lugar de hacer doble arrow arriba usamos este
													onChange={this.leerCampo(index)}
													type="email"
													placeholder="Email"
													className="form-control"
												/>
												<div className="input-group-append">
													<button
														onClick={this.quitarCampo(index)}
														type="button"
														className="btn btn-danger"
													>
														{/* &times agrega una x */}
														&times; Eliminar
													</button>
												</div>
											</div>
										</div>
									))}
									<div className="form-group d-flex justify-content-center col-md-12">
										<button onClick={this.nuevoCampo} type="button" className="btn btn-warning">
											+ Agregar Email
										</button>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label>Edad</label>
										<input
											type="text"
											className="form-control"
											placeholder="Edad"
											onChange={(e) => {
												this.setState({
													cliente: {
														...this.state.cliente,
														edad: e.target.value
													}
												});
											}}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>Tipo Cliente</label>
										<select
											onChange={(e) => {
												this.setState({
													cliente: {
														...this.state.cliente,
														tipo: e.target.value
													}
												});
											}}
											className="form-control"
										>
											<option value="">Elegir...</option>
											<option value="PREMIUM">PREMIUM</option>
											<option value="BASICO">BÁSICO</option>
										</select>
									</div>
								</div>
								<button type="submit" className="btn btn-success float-right">
									Agregar Cliente
								</button>
							</form>
						)}
					</Mutation>
				</div>
			</Fragment>
		);
	}
}

export default NuevoCliente;
