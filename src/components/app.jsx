const React = require("react");
const propTypes = require("prop-types");

const styled = require("styled-components").default;

const Preview = require("shortcut-preview").default;
const Button = require("./button.jsx");

const plistParser = require("bplist-parser");

class AppUnstyled extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			shortcutID: "",
			shortcutMetadata: null,
		};

		this.updateShortcut = this.updateShortcut.bind(this);
	}

	async updateShortcut(event) {
		const shortcutID = event.target.value;
		this.setState({
			shortcutID,
		});

		if (shortcutID === null) {
			return this.setState({
				error: true,
			});
		}

		try {
			const shortcutURL = "https://shortcutsweb.app/inspectshortcut?id=" + encodeURIComponent(shortcutID);
			const shortcutPlist = await fetch(shortcutURL).then(response => {
				return response.arrayBuffer();
			});
			window.e = shortcutPlist;
			const shortcut = await plistParser.parseFile(Buffer.from(shortcutPlist));

			this.setState({
				error: false,
				shortcutMetadata: shortcut,
			});
		} catch (error) {
			this.setState({
				error: true,
			});
		}
	}

	render() {
		return <div className={this.props.className}>
			<input type="text" placeholder="Enter a shortcut ID..." autoCorrect="off" autoCapitalize="off" autoComplete="off" spellCheck={false} defaultValue={this.state.shortcutID} onInput={this.updateShortcut} style={{
				color: this.state.error && "#FFBFBF",
			}} />
			<div>
				<div>
					<h1>
						Execution log
					</h1>
					<Button disabled={this.state.error || !this.state.shortcutID}>
						Execute
					</Button>
					<div>
No execution log available
					</div>
				</div>
				<div>
					<h1>
						Preview
					</h1>
					<div>
						{this.state.shortcutMetadata ? <Preview data={this.state.shortcutMetadata} /> : <span>
							No preview avaiable
						</span>}
					</div>
				</div>
			</div>
		</div>;
	}
}
AppUnstyled.propTypes = {
	className: propTypes.string,
};

const App = styled(AppUnstyled)`
	width: 100%;
	height: 100%;
	padding: 24px;

	font-family: 'Ubuntu', sans-serif;
	color: #ddd;

	input {
		width: 100%;
		height: 40px;
		margin-bottom: 12px;
		padding: 0 12px;

		font-size: 20px;
		color: #ddd;
		&::placeholder {
			color: #999;
		}

		border: 2px solid #222;
		border-radius: 8px;

		transition: 0.2s background-color, 0.2s border-color;
		background-color: #555;
		&:focus {
			outline: none;
			border-color: #7DF;
			background-color: #777;
		}
	}

	& > div {
		display: flex;
		height: calc(100% - 52px);

		& > div {
			flex: 1;
			height: 100%;
			padding: 12px;

			border: 2px solid #222;
			border-radius: 8px;
			background-color: #555;

			display: flex;
			flex-direction: column;

			& > h1 {
				margin: 0;
				font-size: 1.8em;
			}

			&:not(:last-child) {
				margin-right: 12px;
			}

			& > *:not(:last-child) {
				margin-bottom: 12px;
			}
		}
	}
`;
module.exports = App;