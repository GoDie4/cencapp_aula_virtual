'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Global } from '@/helper/Global';
import { config } from '@/config/config';

const CategoriaFormulario = () => {
    const initialValues = {
        nombres: '',
        url_imagen: null, // Inicialmente no hay imagen seleccionada
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append('nombres', values.nombres);
            if (values.url_imagen) {
                formData.append('url_imagen', values.url_imagen); // Añade el archivo si se seleccionó
            }

            const response = await fetch(`${config.apiUrl}/categorias/crear`, { // Reemplaza con la URL correcta de tu API si es diferente
                method: 'POST',
                body: formData, // ¡Importante! Enviar FormData como body
            });

            if (response.ok) {
                const data = await response.json();
                alert('Categoría creada con éxito: ' + data.message);
                resetForm(); // Limpia el formulario después del éxito
            } else {
                const errorData = await response.json();
                alert('Error al crear categoría: ' + errorData.message);
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('Error al enviar la petición:', error);
            alert('Error al enviar la petición al servidor.');
        } finally {
            setSubmitting(false); // Indica que la petición ha terminado
        }
    };

    return (
        <div>
            <h1>Crear Nueva Categoría</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form encType="multipart/form-data"> {/* ¡Importante! encType para FormData */}
                        <div>
                            <label htmlFor="nombres">Nombre de la Categoría:</label>
                            <Field type="text" id="nombres" name="nombres" />
                            <ErrorMessage name="nombres" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="url_imagen">Imagen de Categoría:</label>
                            <input
                                type="file"
                                id="url_imagen"
                                name="url_imagen"
                                onChange={(event) => {
                                    setFieldValue('url_imagen', event.currentTarget.files[0]); // Guarda el archivo en Formik
                                }}
                            />
                            <ErrorMessage name="url_imagen" component="div" className="error" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Crear Categoría'}
                        </button>
                    </Form>
                )}
            </Formik>

            <style jsx>{`
                .error {
                    color: red;
                    margin-top: 0.5em;
                }
                label {
                    display: block;
                    margin-bottom: 0.5em;
                    font-weight: bold;
                }
                input[type="text"],
                input[type="file"] {
                    width: 100%;
                    padding: 0.7em;
                    margin-bottom: 1em;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box; /* Para que padding no aumente el ancho total */
                }
                button[type="submit"] {
                    padding: 0.8em 1.5em;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1em;
                    transition: background-color 0.3s ease;
                }
                button[type="submit"]:hover {
                    background-color: #0056b3;
                }
                button[type="submit"]:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                }
                div {
                    margin-bottom: 1em;
                }
            `}</style>
        </div>
    );
};

export default CategoriaFormulario;