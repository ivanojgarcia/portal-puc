import React, { Fragment, useState } from 'react';

import {
  Input,
  FormGroup,
  Form,
  Row,
  Col,
  Spinner,
  Button,Toast,
  ToastHeader,
  ToastBody,
  Label } from 'reactstrap';

import {Animated} from 'react-animated-css';
import { useMutation } from 'react-apollo';
import { ADD_CASES } from 'mutation/Beaware';
import { ADD_NOTES } from 'mutation/Beaware';
import { withRouter } from 'react-router-dom';

const InputDetails = (props) => {
    const product = JSON.parse(localStorage.getItem('product'));
    const motivos = JSON.parse(localStorage.getItem('motivos'));
    const subMotivos = JSON.parse(localStorage.getItem('subMotivos'));
    const initialStateCase = {
        asunto: '',
        idproducto: product.id,
        idtipo: motivos.id,
        idsubtipo: subMotivos.id,
        idcontacto: parseInt(localStorage.getItem('id')),
        key: localStorage.getItem('key'),
        username: localStorage.getItem('username')
    };    
    const [spinner, addSpinner] = useState(false)
    const [cases, addCases] = useState(initialStateCase)
    const [notes, addNotes] = useState({})
    const [showNotification, addshowNotification] = useState(false)
    const [showToastr, setShowToastr] = useState(false);
    const toggle = () => setShowToastr(!showToastr);

  // Función que actualizará el State
    const updateStateCases = e => {
        addCases({
          ...cases,
          [e.target.name] : e.target.value
      });
    }
    const updateStateNotes = e => {
        addNotes({
          ...notes,
          [e.target.name] : e.target.value
      });
    }

    console.log(notes)
    const [addCasesMutation, { dataCases, errorCases }] = useMutation(ADD_CASES,{
        onCompleted(addCasesMutation){
            console.log(addCasesMutation.addCases.id);
            if(addCasesMutation.addCases.id){
                const initialStateNotes = {
                    idobjeto: addCasesMutation.addCases.id,
                    texto: `Ambiente del Caso: ${notes.instance}. Detalle de la Consulta: ${notes.details}`,
                    tipoobjeto: 'casos',
                    key: localStorage.getItem('key'),
                    username: localStorage.getItem('username')
                };

                addNoteMutation({ variables: { input: initialStateNotes } })
            }
        }
    })
    

    const [addNoteMutation, { dataNotes, errorNotes }] = useMutation(ADD_NOTES, {
        onCompleted(addNoteMutation) {
            setShowToastr(true);
            addSpinner(false)
            setTimeout(() => {
                props.history.push('/');
              }, 3000);

        }
    })

    const saveCase = e => {
        e.preventDefault();
        addSpinner(true)
        
        addCasesMutation({ variables: { input: cases } })
    }

    return (
        <>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <Form onSubmit={saveCase}>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="asunto">Asunto</Label>
                        <Input  type="text" name="asunto" id="asunto" placeholder="Ingrese el asunto del caso" onChange={updateStateCases} />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="instance">Ambiente</Label>
                        <Input type="select" name="instance" id="instance" onChange={updateStateNotes}>
                            <option value="">Seleccione...</option>
                            <option value="Producción">Producción</option>
                            <option value="Test">Test</option>
                            <option value="Desarrollo">Desarrollo</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="details">Detalle del Caso</Label>
                            <Input type="textarea" name="details" id="details" onChange={updateStateNotes} />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <Button type="buttom" className="btn-round" color="success">
                            {(spinner) ? <Spinner color="light" /> : 'Crear Caso'}
                        </Button>
                    </Col>
                </Row>                
            </Form>
        </Animated>
        <h4 className="mb-3">Su selección: </h4>
        <hr />
        <Toast isOpen={showToastr}
              style= {{
                position: 'absolute',
                zIndex: '2000',
                bottom: '0px',
                right: '24px'
              }}
            >
              <ToastHeader toggle={toggle} className="bg-primary text-white">
                Notificación
              </ToastHeader>
              <ToastBody>
              <i className="nc-icon nc-alert-circle-i text-danger mr-3"></i>  El caso se ha creado con éxito
              </ToastBody>
            </Toast>
        </>
    )
};

export default withRouter(InputDetails);