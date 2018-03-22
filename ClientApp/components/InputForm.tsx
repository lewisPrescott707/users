import * as React from "react";
import { PropTypes } from "react";

//Step 2: Initialise the props with an interface
interface IInputFormComponentProps {
    value?: string;
    name?: string;
    onValueChange: (value: any) => void;
}


//Step 3: Declare the state interfaces
interface IInputFormComponentState {
    value: string;
    name: string;
}

const initialState: IInputFormComponentState = {
    value: '',
    name: ''
};

export class InputForm extends React.Component<IInputFormComponentProps, IInputFormComponentState> {

    // Step 1: Our component has a properties
    // A string and a function that returns the value 
    // when the value changes
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        onValueChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        value: "",
        name: "",
    };

    constructor(props: IInputFormComponentProps) {
        super(props);

        // Step 3
        this.state = initialState;


        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps: IInputFormComponentProps, prevState: IInputFormComponentState): void {
        //Step 4: When the components update add the following code 

        if (this.props.onValueChange) {
            this.props.onValueChange(this.state);
        }
    }

    public render(): JSX.Element {
        //Step : Add the render method for the field
        return (
            <div>
                <label>
                    {this.props.name}
                    <input type="text" name={this.props.name} value={this.state.value} onChange={this.handleChange} />
                </label>
            </div>
        );
    }

    private handleChange(event: any): void {
        this.setState({ name: event.target.name, value: event.target.value });
    }
}

export default InputForm;