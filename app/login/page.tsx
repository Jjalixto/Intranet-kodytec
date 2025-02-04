    "use client";

    import { useRouter } from "next/navigation";
    import React, { useEffect, useState } from "react";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { RiGitRepositoryPrivateLine, RiLoaderLine, RiMoonLine, RiSunLine, RiUserLine } from "react-icons/ri";
    import { loginUser } from "../service/auth.service";
    import Image from "next/image";

    interface LoginFormValues {
        codigo: string;
        clave: string;
    }

    const LoginPage: React.FC = () => {
        const [isDarkMode, setIsDarkMode] = useState(false);
        const [serverError, setServerError] = useState(''); // Estado para el error del servidor
        const [loading, setLoading] = useState(false); // Estado para la pantalla de carga
        const router = useRouter();

        useEffect(() => {
            if (isDarkMode) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }, [isDarkMode]);

        const initialValues: LoginFormValues = {
            codigo: '',
            clave: '',
        };

        // const validationSchema = Yup.object().shape({
        //     codigo: Yup.string().required('Ingresa tu código'),
        //     clave: Yup.string().required('Ingresa tu contraseña').min(8, 'La contraseña debe tener al menos 8 caracteres'),
        // });

        // const handleSubmit = async (values: LoginFormValues) => {
        //     setServerError('');
        //     setLoading(true);
        //     try {
        //         const response = await loginUser(values);

        //         if (response.isSuccess) {
        //             const user = response.data;
        //             const message = response.message;

        //             localStorage.setItem('usuario', JSON.stringify(user));
        //             localStorage.setItem('message', message);
        //             router.push('/dashboard');
        //         } else {
        //             setServerError(response.message || 'Credenciales incorrectas');
        //         }
        //     } catch (err: unknown) {
        //         if (err instanceof Error) {
        //             setServerError(err.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
        //             console.log(err.message);
        //         } else {
        //             setServerError('Error al iniciar sesión. Por favor, intenta de nuevo.');
        //         }
        //     } finally {
        //         setLoading(false); // Ocultar pantalla de carga al terminar
        //     }
        // };

        const validationSchema = Yup.object().shape({
            codigo: Yup.string().required('Ingresa tu código'),
            clave: Yup.string().required('Ingresa tu contraseña').min(8, 'La contraseña debe tener al menos 8 caracteres'),
        });

        const handleSubmit = async (values: LoginFormValues) => {
            setServerError('');
            setLoading(true);
            try {
                if (values.codigo === 'admin' && values.clave === 'admin') {
                    const user = { codigo: 'admin', nombre: 'Administrador' };
                    const message = 'Inicio de sesión exitoso';

                    localStorage.setItem('usuario', JSON.stringify(user));
                    localStorage.setItem('message', message);
                    router.push('/dashboard');
                } else {
                    setServerError('Credenciales incorrectas');
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setServerError(err.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
                    console.log(err.message);
                } else {
                    setServerError('Error al iniciar sesión. Por favor, intenta de nuevo.');
                }
            } finally {
                setLoading(false); // Ocultar pantalla de carga al terminar
            }
        };    
        return (
            <div className="flex h-screen">
                {/* Mostrar pantalla de carga cuando 'loading' esté activo */}
                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                        <RiLoaderLine className="animate-spin w-20 h-20 text-blue-500" />
                    </div>
                )}

                {/* Contenido principal */}
                <div className="hidden md:flex flex-1 items-center justify-center p-8 dark:bg-gray-900">
                    <Image
                        src="/images/logo_kodytec.png"
                        alt="Logo Kodytec"
                        width={400}
                        height={200}
                        priority
                        unoptimized
                        style={{ width: '100%', maxWidth: '400px' }}
                        className="max-w-full max-h-full"
                    />
                </div>
                <div className="flex-1 flex items-center justify-center p-8 bg-[#F2F4FE] dark:bg-gray-900">
                    <button className="absolute top-4 left-4" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <RiSunLine className="w-8 h-8 text-white" /> : <RiMoonLine className="w-8 h-8" />}
                    </button>
                    <div className="w-full max-w-md bg-white rounded-lg p-8 mb-8 dark:bg-gray-900">
                        <div className="md:hidden flex items-center justify-center mb-8">
                            <Image
                                src="/images/logo_kodytec.png"
                                alt="Logo Kodytec"
                                width={400}
                                height={200}
                                priority
                                unoptimized
                                className="w-3/4 max-w-xs"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-1 mb-8">
                            <h1 className="text-xl text-gray-900 dark:text-white">¡Iniciemos sesión!</h1>
                            <p className="text-gray-400 text-sm">Puedes visualizar tus cursos, notas y pagos en un solo lugar</p>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-4">
                                        <div className="relative">
                                            <RiUserLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                                            <Field
                                                className="w-full pl-10 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-black"
                                                type="text"
                                                name="codigo"
                                                placeholder="Código de alumno"
                                            />
                                        </div>
                                        <ErrorMessage name="codigo" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <div className="relative">
                                            <RiGitRepositoryPrivateLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                                            <Field
                                                className="w-full pl-10 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-black"
                                                type="password"
                                                name="clave"
                                                placeholder="Contraseña"
                                            />
                                        </div>
                                        <ErrorMessage name="clave" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex justify-center items-center bg-primary hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                                        disabled={isSubmitting || loading} // Desactivar botón cuando cargando
                                    >
                                        {isSubmitting ? (<RiLoaderLine className="animate-spin w-6 h-6" />) : ('Ingresar')}
                                    </button>
                                    {serverError && <div className="text-red-500 text-sm mt-4">{serverError}</div>}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    };

    export default LoginPage;
