import React from "react";

import { MainForm } from "./components/mainForm";
import { TinyUrlDetailsForm } from "./components/tinyUrlDetailsForm";

const App = () => {
	const [submissionCompleted, setSubmissionCompleted] = React.useState(false);
	const [srcUrl, setSrcUrl] = React.useState("");
	const [alias, setAlias] = React.useState("");
	return (
		<div className="container">
			{!submissionCompleted && (
				<MainForm
					setSubmissionCompleted={setSubmissionCompleted}
					srcUrl={srcUrl}
					setSrcUrl={setSrcUrl}
					alias={alias}
					setAlias={setAlias}
				/>
			)}
			{submissionCompleted && (
				<TinyUrlDetailsForm
					setSubmissionCompleted={setSubmissionCompleted}
					srcUrl={srcUrl}
					setSrcUrl={setSrcUrl}
					alias={alias}
					setAlias={setAlias}
				/>
			)}
		</div>
	);
};

export default App;
