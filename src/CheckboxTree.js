import React from "react";

// 스위치 버튼 모양의 체크박스
export function CheckboxSwitch(props) {
    return (
            <label>{checkboxLabelFinder(props.checkboxArray, props.name)}
                <input type="checkbox"
                       checked={checkboxValueFinder(props.checkboxArray, props.name)}
                       onChange={() => props.setCheckboxArray(
                           checkboxHandler(props.checkboxArray, props.name,
                               !checkboxValueFinder(props.checkboxArray, props.name)))}
                />
            </label>
    )
}
//

///// 자식의 자식 체크박스까지 일괄 변경하는 함수들 (예시 참고: PassageBigData.js)
// 특정 name의 체크박스 value 변경하는 함수
export function checkboxHandler(array, name, bool) {
    let arr = [...array];

    // 자식들까지 모두 체크박스 value 변경
    function checkboxChildrenLoop(ar, bl) {
        for (let i of ar) {
            i.value = bl;
            if (i.children) {
                checkboxChildrenLoop(i.children, bl)
            }
        }
    }
    // 부모 체크박스 value 검증
    function checkboxParentValidation (ar, nm) {
        for (let i of ar) {
            if (i.name === nm) {
                let array = i.children.map(s => s.value);
                i.value = !!array.every(v => v === true);
                if (i.parent) {checkboxParentValidation(arr, i.parent)}
            } else {
                if (i.children) {checkboxParentValidation(i.children, nm)}
            }
        }
    }

    // 특정 name의 value 변경
    function checkboxNameLoop(ar, nm, bl) {
        for (let i of ar) {
            if (i.name === nm) {
                i.value = bl;
                if (i.parent) {checkboxParentValidation(arr, i.parent)}
                if (i.children) {checkboxChildrenLoop(i.children, bl)}
            } else {
                if (i.children) {checkboxNameLoop(i.children, nm, bl);}
            }
        }
    }

    checkboxNameLoop(arr, name, bool)
    return arr
}

// 특정 name의 체크박스의 value(true/false)를 찾아주는 함수
export function checkboxValueFinder(array, name) {
    let result;

    function checkboxLoop(ar, nm) {
        for (let i of ar) {
            if (i.name === nm) {
                result = i.value;
            } else {
                if (i.children) {
                    checkboxLoop(i.children, nm);
                }
            }
        }
    }

    checkboxLoop(array, name);
    return result
}

// 특정 name의 체크박스의 label을 찾아주는 함수
export function checkboxLabelFinder(array, name) {
    let result;
    function checkboxLoop(ar, nm) {
        for (let i of ar) {
            if (i.name === nm) {
                result = i.label;
            } else {
                if (i.children) {
                    checkboxLoop(i.children, nm);
                }
            }
        }
    }

    checkboxLoop(array, name);
    return result;
}
