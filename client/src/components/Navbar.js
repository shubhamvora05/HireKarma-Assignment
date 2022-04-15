import React from 'react';
import Select from 'react-select';
import './Navbar.css';

const Navbar = ({userLang, setUserLang}) => {
	const languages = [
		{ value: "c", label: "C" },
		{ value: "cpp", label: "C++" },	
		{ value: "java", label: "Java" },
	];
	
	return (
		<div className="navbar">
			<Select options={languages} value={userLang}
					onChange={(e) => setUserLang(e.value)}
					placeholder={userLang} />
		</div>
	)
}

export default Navbar
