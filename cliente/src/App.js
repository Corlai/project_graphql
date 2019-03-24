import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
//Esto se puede crear como un componente o en otra carpeta
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Importar componentes

import Header from './components/header';
import Clientes from './components/Clientes';
import EditarCliente from './components/editarCliente';
import NuevoCliente from './components/nuevoCliente';

//Creamos el cliente de apollo
const client = new ApolloClient({
	//url donde el cliente se conectara
	uri: 'http://localhost:4000/graphql',
	// Para deshabilitar typenames
	cache: new InMemoryCache({
		addTypename: false
	}),
	//en caso de que haya errores lo imprime en consola
	onError: ({ networkErro, graphQlErrors }) => {
		console.log('graphQLErrors', graphQlErrors);
		console.log('networkError', graphQlErrors);
	}
});

class App extends Component {
	render() {
		return (
			//Aqui usamo apolloprovider le pasamos el cliente que hemos creado y dentro están nuestros componentes
			<ApolloProvider client={client}>
				{/* Todo lo que son enlaces tienen que estar dentro de Router para poder redirigir */}
				<Router>
					{/* Router solo tiene que tener un hijo por eso lo metemos dentro de Fragment */}
					<Fragment>
						<Header />
						<div className="container">
							<Switch>
								{/* Rutas según vamos */}
								<Route exact path="/" component={Clientes} />
								<Route exact path="/cliente/editar/:id" component={EditarCliente} />
								<Route exact path="/cliente/nuevo" component={NuevoCliente} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;
