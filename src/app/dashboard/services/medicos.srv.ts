import { Injectable } from "@angular/core";  
import { IMedico } from "../../../shared/interfaces/personas";
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "@angular/fire/firestore";
import { PATHS } from "../../../core/constants/storage";
import { Observable } from "rxjs";
 

@Injectable({
    providedIn:'root'
})
export class MedicosServices {
    

    constructor(
        private firestore: Firestore
    ){

    }
    add(medico : IMedico){
        const CREATE_MEDICO = collection(this.firestore, PATHS.medicos)
        return addDoc(CREATE_MEDICO, medico)
    }

    getListMedicos(): Observable<IMedico[]>{
        const GET_LIST_MEDICO = collection(this.firestore, PATHS.medicos)
        return collectionData(GET_LIST_MEDICO, {idField : 'id_medico'})  as Observable<IMedico[]>
    }

    async getMedico(id : string){
        const GET_MEDICO = doc(this.firestore, PATHS.medicos, id);
        const MEDICO =  await getDoc(GET_MEDICO)
        return MEDICO.data() as IMedico;
    }

    update(id : string, medico : IMedico){
        const UPDATE_MEDICO = doc(this.firestore, PATHS.medicos, id);
        return updateDoc(UPDATE_MEDICO, {...medico});
    }

    delete(id : string){
        const DELETE_MEDICO = doc(this.firestore, PATHS.medicos +`/${id}`);
        return deleteDoc(DELETE_MEDICO);
    }
}