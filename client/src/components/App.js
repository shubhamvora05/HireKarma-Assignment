import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Button} from 'react-bootstrap';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar';
import Axios from 'axios';
import spinner from '../loading.svg';

function App() {

// State variable to set users source code
const [userCode, setUserCode] = useState(``);

// State variable to set editors default language
const [userLang, setUserLang] = useState("C");

// State variable to set editors default theme
const [userTheme, setUserTheme] = useState("vs-dark");

// State variable to set editors default font size
const [fontSize, setFontSize] = useState(20);

// State variable to set users input
const [userInput, setUserInput] = useState("");

// State variable to set users output
const [userOutput, setUserOutput] = useState("");

// Loading state variable to show spinner
// while fetching data
const [loading, setLoading] = useState(false);

const options = {
	fontSize: fontSize
}

// Function to call the compile endpoint
function compile() {
	setLoading(true);
	if (userCode === ``) {
	return
	}

	// Post request to compile endpoint
	Axios.post(`http://localhost:8000/compile`, {
	code: userCode,
	language: userLang,
	input: userInput }).then((res) => {
	setUserOutput(res.data.output);
	}).then(() => {
	setLoading(false);
	})
}

// Function to clear the output screen
function clearOutput() {
	setUserOutput("");
}

return (
	<div className="App">

  <Row className="Row">
	  <Col className="Col">
		  <h3>1. TWO SUM</h3>
		  <hr/>
	  <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>

<p>You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.</p>

<p><b>Example 1:</b></p>
<div className='Examples'>
<p><span><b>Input: </b>nums = [2,7,11,15], target = 9</span><br/>
<span><b>Output: </b> [0,1]</span><br/>
<span><b>Explanation: </b>Because nums[0] + nums[1] == 9, we return [0, 1].</span>
</p>
</div>

<p><b>Example 2:</b></p>
<div className='Examples'>
<p><span><b>Input: </b>nums = [3,2,4], target = 6</span><br/>
<span><b>Output: </b> [1,2]</span><br/>
</p>
</div>

<p><b>Example 3:</b></p>
<div className='Examples'>
<p><span><b>Input: </b>nums = [3,3], target = 6</span><br/>
<span><b>Output: </b> [0,1]</span><br/>
</p>
</div>

<p><b>Constraints</b></p>
<div className='Examples'>
<ul>
<li>2 &lt; nums.length &lt; 10000 </li>
<li>-1000 &lt; nums[i] &lt; 1000</li>
<li>-1000 &lt; target &lt; 1000</li>
</ul>
</div>

</Col>

    <Col className="Col" lg={6} mid={12}>
	<Navbar
		userLang={userLang} setUserLang={setUserLang}
		userTheme={userTheme} setUserTheme={setUserTheme}
		fontSize={fontSize} setFontSize={setFontSize}
	/>
		<Editor
			options={options}
			height="50%"
			width="100%"
			theme={userTheme}
			language={userLang}
			defaultLanguage="python"
			defaultValue="// Enter your code here"
			onChange={(value) => { setUserCode(value) }}
		/>
		<Button className="btn float-right" onClick={() => compile()}>
			Run
		</Button>
		<div className='Input'>
		<h4>Input:</h4>
			<textarea id="code-inp" onChange=
			{(e) => setUserInput(e.target.value)}>
			</textarea>
		</div>
		
		<h4>Output:</h4>
		<div className='Output'>
		{loading ? (
			<div className="spinner-box">
			<img src={spinner} alt="Loading..." />
			</div>
		) : (
			<div className="output-box">
			<pre>{userOutput}</pre>
			<Button onClick={() => { clearOutput() }}
				className="btn float-right">
				Clear
			</Button>
			</div>
		)}
		</div>
	</Col >
  </Row>

	</div>
);
}

export default App;
