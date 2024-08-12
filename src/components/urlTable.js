import React from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { tinyUrlServer } from "../secrets/config";

export const URLTable = React.memo(() => {
	const [documents, setDocuments] = React.useState([]);

	React.useEffect(() => {
		async function getAllDocuments() {
			let result = undefined;
			try {
				const result = await axios.get(
					`${tinyUrlServer}/api/getAllTinyUrls`
				);

				if (result) {
					setDocuments(result.data);
				} else {
					throw { error: "No docs found" };
				}
			} catch (error) {
				console.log(error);
				result = [];
			}

			return result;
		}
		getAllDocuments();
	}, []);

	const table = React.useMemo(() => {
		let rows = [];
		if (documents?.length > 0) {
			console.log(documents);

			rows = documents?.map((doc) => {
				return (
					<tr>
						<td>{doc?._id}</td>
						<td>{doc?.srcUrl}</td>
						<td>{doc?.alias}</td>
						<td>{doc?.clicks}</td>
					</tr>
				);
			});
		}

		return rows;
	}, [documents]);

	return (
		<div className="container" style={{ maxWidth: 500 }}>
			<h2>Your URLs</h2>
			<p className="lead">This is a table all of all your URLs.</p>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Source URL</th>
						<th>Alias</th>
						<th>Number of Clicks</th>
					</tr>
				</thead>
				<tbody>{table}</tbody>
			</Table>
		</div>
	);
});
