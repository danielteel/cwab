import {Modal, Header, Button} from 'semantic-ui-react';

export default function ConfirmationModal({onYes, onNo, isOpen, title, content}){
    return (
        <Modal open={isOpen} size="tiny">
        {
            content
            ?
                <Modal.Header>{title}</Modal.Header>
            :
                null
        }
        <Modal.Content>
          <Modal.Description>
              {content?content:<Header>{title}</Header>}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button positive content={"Yes"} onClick={onYes}/>
          <Button color='black' content={"No"} onClick={onNo}/>
        </Modal.Actions>
      </Modal>
    )
}