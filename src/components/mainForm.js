import React from 'react';
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import { tinyUrlServer } from '../secrets/config';
import { isValidUrl } from '../helpers/helpers';

export const MainForm = React.memo(({setSubmissionCompleted, srcUrl, setSrcUrl, alias, setAlias}) => {
        const [srcUrlDirty, setSrcUrlDirty] = React.useState(false);
        const [srcUrlValidationMsg, setSrcUrlValidationMsg] = React.useState('');
        const [aliasDirty, setAliasDirty] = React.useState(false);
        const [aliasValidationMsg, setAliasValidationMsg] = React.useState('');

        const formSubmitOnClick = React.useCallback(async () => {
                if (!srcUrl) {
                        setSrcUrlDirty(true);
                        setSrcUrlValidationMsg('The URL is missing.')
                }

                if (!alias) {
                        setAliasDirty(true);
                        setAliasValidationMsg('The alias is missing.')
                }

                if (!srcUrl || !alias) {
                        return;
                } 

                if (srcUrl && alias) {
                        const validUrl = isValidUrl(srcUrl);

                        if (!validUrl) {
                                setSrcUrlDirty(true);
                                setSrcUrlValidationMsg('This URL is not valid.')
                                return;
                        }

                        const result = await axios.get(`${tinyUrlServer}/api/getAlias/${alias}`)
                        .catch(error => {
                                console.log(error);
                        })

                        if (result?.data !== 'Not found') {
                                setAliasDirty(true);
                                setAliasValidationMsg('This alias is already in use. Please choose another.')
                                return;
                        }

                        axios.post(`${tinyUrlServer}/api/create-tinyurl`,
                                {
                                        srcUrl,
                                        alias
                                }
                        ).catch(error => {
                                console.log(error);
                        }).then(result => {
                                console.log(result);
                        })

                        setSubmissionCompleted(true);
                }
        }, [alias, aliasDirty, srcUrl, srcUrlDirty, setSubmissionCompleted]);

        const srcUrlOnChange = React.useCallback((event) => {
                setSrcUrl(event?.target?.value)
        }, []);

        const aliasOnChange = React.useCallback((event) => {
                setAlias(event?.target?.value)
        }, []);

        return (
                <div className='container' style={{ maxWidth: 500 }}>
                        <h2>TinyURL</h2>
                        <p className='lead'>Create an alias that can be used for your URL to shorten it.</p>
                        <Form validated={!srcUrlDirty && !aliasDirty && srcUrl && alias}>
                                <Form.Group className='mb-3'>
                                        <Form.Label>Shorten a long url</Form.Label>
                                        <Form.Control
                                                type="url"
                                                isInvalid={srcUrlDirty}
                                                value={srcUrl}
                                                onChange={srcUrlOnChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>{srcUrlValidationMsg}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                        <Form.Label>Customize Your Link</Form.Label>
                                        <Form.Control
                                                type="text"
                                                isInvalid={aliasDirty}
                                                value={alias}
                                                onChange={aliasOnChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>{aliasValidationMsg}</Form.Control.Feedback>
                                </Form.Group>

                                <Button type='button' className='btn btn-primary' style={{marginTop: 10}} onClick={formSubmitOnClick}>Create your link</Button>
                        </Form>
                </div>
        )
});