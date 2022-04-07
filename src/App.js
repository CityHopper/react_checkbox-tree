import {useState} from "react";
import {CheckboxSwitch} from "./CheckboxTree";
import './App.css';

function App() {
    const [checkboxes, setCheckboxes] = useState([
            {
                label: "모든 과일",
                name: "all",
                value: false,
                parent: false,
                children: [
                    {
                        label: "사과",
                        name: "apple",
                        value: false,
                        parent: "all",
                        children: [
                            {
                                label: "빨간 사과",
                                name: "apple-red",
                                value: false,
                                parent: "apple",
                                children: false
                            },
                            {
                                label: '초록 사과',
                                name: 'apple-green',
                                value: false,
                                parent: "apple",
                                children: false
                            }
                        ]
                    },
                    {
                        label: '바나나',
                        name: 'banana',
                        value: false,
                        children: false,
                        parent: "all"
                    },
                    {
                        label: '자몽',
                        name: 'grapefruit',
                        value: false,
                        children: false,
                        parent: "all"
                    },
                ]
            }
        ]
    )

    return (
        <>
            {/*{*/}
            {/*    checkboxes.map((c, i) => (*/}
            {/*        */}
            {/*    ))*/}
            {/*}*/}
            모든 과일
            <CheckboxSwitch
                checkboxArray={checkboxes}
                setCheckboxArray={setCheckboxes}
                name={"all"}/>


        </>
    );
}

export default App;
