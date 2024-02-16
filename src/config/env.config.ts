
/* ARCHIVO PARA VALIIDADR LAS VARIABLES DE ENTORNO */


export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT || 3002,
    default_limit: +process.env.DEFAULT_LIMIT || 7

})

/* es lo mismo que: */

// export const EnvConfiguration = () => {
//     return {

//     }
// }


