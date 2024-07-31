import React from 'react';
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import { tinyUrlServer } from '../secrets/config';

export const MainForm = React.memo(() => {
        const [srcUrlDirty, setSrcUrlDirty] = React.useState(false);
        const [srcUrl, setSrcUrl] = React.useState('');
        const [srcUrlValidationMsg, setSrcUrlValidationMsg] = React.useState('');
        const [aliasDirty, setAliasDirty] = React.useState(false);
        const [alias, setAlias] = React.useState('');
        const [aliasValidationMsg, setAliasValidationMsg] = React.useState('');

        const formSubmitOnClick = React.useCallback((event) => {
                if (!srcUrlDirty && srcUrl && !aliasDirty && alias) {
                        axios.post(`${tinyUrlServer}/create-tinyurl`,
                                {
                                        srcUrl,
                                        alias
                                }
                        ).catch(error => {
                                console.log(error);
                        }).then(result => {
                                console.log(result);
                        })
                }
        }, [alias, aliasDirty, srcUrl, srcUrlDirty]);

        const srcUrlOnChange = React.useCallback((event) => {
                setSrcUrl(event?.target?.value)
        }, []);

        React.useEffect(() => {
                if (srcUrl) {
                        // if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(srcUrl)) {
                        //         setSrcUrlDirty(true);
                        //         setSrcUrlValidationMsg('The long URL is not in a valid format');
                        //         return;
                        // }
                }

                setSrcUrlDirty(false);
                setSrcUrlValidationMsg('');
        }, [srcUrl]);

        const aliasOnChange = React.useCallback((event) => {
                setAlias(event?.target?.value)
        }, []);

        React.useEffect(() => {
                if (alias) {
                        // if (!alias.match(/a-zA-Z0-9/i)) {
                        //         setAliasDirty(true)
                        //         setAliasValidationMsg('SpinRate is not a number');
                        //         return;
                        // }
                }

                setAliasDirty(false);
                setAliasValidationMsg('');
        }, [alias]);

        return (
                <div className='container' style={{ maxWidth: 500 }}>
                        <h2>TinyURL</h2>
                        <p className='lead'>Create an alias that can be used for your URL to shorten it.</p>
                        <Form validated={srcUrl && aliasDirty}>
                                <Form.Group className='mb3'>
                                        {/* <InputGroup hasValidation> */}
                                        <Form.Label>Shorten a long url</Form.Label>
                                        <Form.Control
                                                type="url"
                                                isInvalid={srcUrlDirty}
                                                value={srcUrl}
                                                onChange={srcUrlOnChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>{srcUrlValidationMsg}</Form.Control.Feedback>
                                        {/* </InputGroup> */}
                                </Form.Group>

                                <Form.Group>
                                        {/* <InputGroup hasValidation> */}
                                        <Form.Label>Customize Your Link</Form.Label>
                                        <Form.Control
                                                type="text"
                                                isInvalid={aliasDirty}
                                                value={alias}
                                                onChange={aliasOnChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>{aliasValidationMsg}</Form.Control.Feedback>
                                        {/* </InputGroup> */}
                                </Form.Group>

                                <Button type='button' className='btn btn-primary mb-3' onClick={formSubmitOnClick}>Submit</Button>
                        </Form>
                </div>
        )
});