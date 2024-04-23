import { Injectable } from "@angular/core";  
import { IPersona } from "../../../shared/interfaces/personas";
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from "@angular/fire/firestore";
import { PATHS } from "../../../core/constants/storage";
import { Observable, from, map } from "rxjs";
 

@Injectable({
    providedIn:'root'
})
export class PersonasServices {
    

    constructor(
        private firestore: Firestore
    ){

    }
    add(persona : IPersona){
        const CREATE_PERSONA = collection(this.firestore, PATHS.personas)
        return addDoc(CREATE_PERSONA, persona)
    }

    getListPersona(): Observable<IPersona[]>{
        const GET_LIST_PERSONA = collection(this.firestore, PATHS.personas)
        return collectionData(GET_LIST_PERSONA, {idField : 'id_persona'})  as Observable<IPersona[]>
    }
  
    getPersona(id: string): Observable<IPersona> {
        const GET_PERSONA = doc(this.firestore, PATHS.personas, id);
        const PERSONA_PROMISE = getDoc(GET_PERSONA);
        return from(PERSONA_PROMISE).pipe(
          map((PERSONA) => PERSONA.data() as IPersona)
        );
      }

    update(id : string, persona : IPersona){
        const UPDATE_PERSONA = doc(this.firestore, PATHS.personas, id);
        return updateDoc(UPDATE_PERSONA, {...persona});
    }

    delete(id : string){
        const DELETE_PERSONA = doc(this.firestore, PATHS.personas +`/${id}`);
        return deleteDoc(DELETE_PERSONA);
    }
}