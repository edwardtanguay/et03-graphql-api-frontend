import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import { useQuery, gql } from '@apollo/client';

const backendEmployeesUrl = 'http://localhost:5424/employees';

interface IEmployee {
	firstName: string;
	lastName: string;
	territoryIDs: number[];
}

const QUERY = gql`
	{
		message
		departments
	}
`;

function App() {
	const [employees, setEmployees] = useState([]);
	const { loading, data } = useQuery(QUERY);

	useEffect(() => {
		(async () => {
			setEmployees((await axios.get(backendEmployeesUrl)).data);
		})();
	}, []);

	return (
		<div className="App">
			<h1>GraphQL and REST Demo</h1>
			<h2>Data from GraphQL API</h2>
			{!loading && (
				<div>
					<div>Message: <span className="data">{data.message}</span></div>
					<div>Departments: <span className="data">{data.departments.join(', ')}</span></div>
				</div>
			)}
			<h2>Data from REST API</h2>
			<h3>There are {employees.length} employees</h3>
			<ul>
				{employees.map((emp: IEmployee, i) => {
					return (
						<li key={i}>
							{emp.firstName} {emp.lastName}
							<ul>
								<li className="data">
									{' '}
									territories: {emp.territoryIDs.join(', ')}
								</li>
							</ul>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
