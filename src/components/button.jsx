const styled = require("styled-components").default;

const Button = styled.button`
	height: 40px;
	padding: 0 12px;

	font-family: 'Ubuntu', sans-serif;
	font-size: 20px;
	color: #222;

	border: 2px solid #222;
	border-radius: 8px;

	transition: 0.2s background-color, 0.2s border-color;
	background-color: #64B5F6;
	&:disabled {
		background-color: #9E9E9E;
		text-decoration: line-through;
	}
	&:hover {
		background-color: #90CAF9;
	}
	&:focus {
		outline: none;
	}
	&:active {
		background-color: #BBDEFB;
	}
`;
module.exports = Button;