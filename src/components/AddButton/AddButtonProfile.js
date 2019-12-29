import React from 'react'

class AddButton extends React.Component {
  
  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

    return(
      <div className={this.showHideClassname}>
        <section className="modal-main">
        <div>
          Add Profile Button Page
        </div>

<button onClick={this.props.handleClose}>close</button>

        {/* <form>
          <p>Button Type</p>
          <input id="buttonType" />
          <p>Button Title</p>
          <input id="buttonTitle" />
        </form> */}
        </section>
      </div>
    )
  }
}

export default AddButton