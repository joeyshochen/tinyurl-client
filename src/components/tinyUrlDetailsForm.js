import { Form, Button } from 'react-bootstrap'
import React from 'react';

export const TinyUrlDetailsForm = ({srcUrl, alias, setSrcUrl, setAlias, setSubmissionCompleted}) => {
    
    const formSubmitOnClick = React.useCallback(() => {
        window.location.href = srcUrl
    }, [srcUrl])

    const shortenAnotherOnClick = React.useCallback(() => {
       setAlias('');
       setSrcUrl('');
       setSubmissionCompleted(false)
    }, [setAlias, setSrcUrl, setSubmissionCompleted])

    const tinyUrl = React.useMemo(() => {
        return window.location.href + alias;
    }, [alias])

    return (
        <div className="container" style={{maxWidth: 500}}>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Your Long URL</Form.Label>
                <Form.Control type="url" value={srcUrl} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>TinyURL</Form.Label>
                <Form.Control type="url" value={tinyUrl} disabled/>
              </Form.Group>

              <Button type='button' className='btn btn-primary mt-10' onClick={formSubmitOnClick}>Redirect</Button>
              <Button type='button' className='btn btn-secondary mt-10 ml-5' onClick={shortenAnotherOnClick}>Shorten Another</Button>
            </Form>

        </div>
    )
}