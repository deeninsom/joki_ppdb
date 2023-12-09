/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const ButtonStep = (props: any)  => {
  return (
    <>
      <button onClick={props.onClick} style={{ fontFamily: "monospace", fontWeight: "bold", color: "GrayText", border: 'none', padding: "20px", borderRadius: "40px" }}>{props.text}</button>
    </>
  )
}

export default ButtonStep