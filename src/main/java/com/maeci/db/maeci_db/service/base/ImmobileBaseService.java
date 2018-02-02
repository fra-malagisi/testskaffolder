package com.maeci.db.maeci_db.service.base;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.maeci.db.maeci_db.entity.Immobile;

//IMPORT RELATIONS

@Service
public class ImmobileBaseService {

	
	@Autowired
	private Datastore datastore;


    //CRUD METHODS
    
    //CRUD - CREATE
    	
	public Immobile insert(Immobile obj) {
		datastore.save(obj);
		return obj;
	}
	
    	
    //CRUD - REMOVE
    
	public void delete(String id) {
		Query<Immobile> query = datastore.createQuery(Immobile.class).field("_id").equal(new ObjectId(id));
		datastore.delete(query);
	}

    	
    //CRUD - GET ONE
    	
	public Immobile get(String id) {
		return datastore.find(Immobile.class).field("_id").equal(new ObjectId(id)).get();
	}

    	
        	
    //CRUD - GET LIST
    	
	public List<Immobile> getList() {
		return (ArrayList<Immobile>) datastore.find(Immobile.class).asList();
	}

    	
    //CRUD - EDIT
    	
	public Immobile update(Immobile obj) {
		datastore.save(obj);
		return obj;
	}
	
    	
    
    

    
    /*
     * CUSTOM SERVICES
     * 
     *	These services will be overwritten and implemented in ImmobileService.java
     */
    


}
