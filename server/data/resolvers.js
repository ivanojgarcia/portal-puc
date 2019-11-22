import { rejects } from 'assert';
import fetch from "node-fetch"

const baseURL = `https://api.beaware360.com/ba360/apir/v10`
// const baseURL = `https://jsonplaceholder.typicode.com`
export const resolvers = {
    Query: {
        getProducts: async (root, {input}) => {
            const username = input.username;

            let buffDecodeKey = Buffer.from(input.key, 'base64');
            let pass = buffDecodeKey.toString('ascii');

            let buff = Buffer.from(username + ":" + pass);
            let base64data = buff.toString('base64');
            const headers = {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + base64data
            }

            return fetch(`${baseURL}/cp/casos/producto/get`, {
                method: 'GET', 
                headers:headers, 
            })
            .then((response) => response.json())
        },
        getMotivos: async (root, {input}) => {
            const username = input.username;

            let buffDecodeKey = Buffer.from(input.key, 'base64');
            let pass = buffDecodeKey.toString('ascii');

            let buff = Buffer.from(username + ":" + pass);
            let base64data = buff.toString('base64');
            const headers = {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + base64data
            }

            return fetch(`${baseURL}/cp/casos/tipo/getby?idproducto=${input.id}`, {
                method: 'GET', 
                headers:headers, 
            })
            .then((response) => response.json())
        },
        getSubMotivos: async (root, {input}) => {
            const username = input.username;

            let buffDecodeKey = Buffer.from(input.key, 'base64');
            let pass = buffDecodeKey.toString('ascii');

            let buff = Buffer.from(username + ":" + pass);
            let base64data = buff.toString('base64');
            const headers = {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + base64data
            }

            return fetch(`${baseURL}/cp/casos/subtipo/getby?idtipo=${input.id}`, {
                method: 'GET', 
                headers:headers, 
            })
            .then((response) => response.json())
        },
        getAllCasosByClient :async (root, {input}) => {
            const username = input.username;

            let buffDecodeKey = Buffer.from(input.key, 'base64');
            let pass = buffDecodeKey.toString('ascii');

            let buff = Buffer.from(username + ":" + pass);
            let base64data = buff.toString('base64');
            const headers = {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + base64data
            }
            return fetch(`${baseURL}/cp/casos/get`, {
                method: 'GET', 
                headers:headers, 
            })
            .then((response) => response.json())
        }
    },

    Mutation: {
        login: async (root, {input}) => {
            const data = {
                "company": input.company,
                "user": input.user,
                "pass": input.pass
            }
            const headers = {
                "Content-Type": "application/json",
            }
           return await fetch(`${baseURL}/login/auth`, {
                method: 'POST', 
                headers:headers, 
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
        },

        loginClient: async (root, {input}) => {            
            const data = {
                "company": input.company,
                "email": input.email,
                "pass": input.pass
            }
            const headers = {
                "Content-Type": "application/json",
            }
           return await fetch(`${baseURL}/cp/auth/login`, {
                method: 'POST', 
                headers:headers, 
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
        },
        addCases: async (root, {input}) => {
            
            const username = input.username;

            let buffDecodeKey = Buffer.from(input.key, 'base64');
            let pass = buffDecodeKey.toString('ascii');

            let buff = Buffer.from(username + ":" + pass);
            let base64data = buff.toString('base64');
            
            const data = {
                "asunto": input.asunto,
                "idcontacto": input.idcontacto,
                "idproducto": input.idproducto,
                "idsubtipo": input.idsubtipo,
                "idtipo": input.idtipo,
            }
            const headers = {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + base64data
            }
           return await fetch(`${baseURL}/cp/casos/add`, {
                method: 'POST', 
                headers:headers, 
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
        },
        addNote: async (root, {input}) => {
            
            const username = input.username;

            let buffDecodeKey = Buffer.from(input.key, 'base64');
            let pass = buffDecodeKey.toString('ascii');

            let buff = Buffer.from(username + ":" + pass);
            let base64data = buff.toString('base64');
            
            const data = {
                "idobjeto": input.idobjeto,
                "texto": input.texto,
                "tipoobjeto": input.tipoobjeto,
            }
            const headers = {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + base64data
            }
           return await fetch(`${baseURL}/cp/casos/notas/add`, {
                method: 'POST', 
                headers:headers, 
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
        }
    }
}

export default resolvers;