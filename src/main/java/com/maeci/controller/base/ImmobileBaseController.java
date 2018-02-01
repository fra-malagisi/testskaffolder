package com.maeci.controller.base;

import org.springframework.security.access.annotation.Secured;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.maeci.db.maeci_db.service.ImmobileService;
import com.maeci.db.maeci_db.mapper.Immobile;

public class ImmobileBaseController {

	ImmobileService immobileService = new ImmobileService();



//CRUD METHODS


    //CRUD - CREATE
    @Secured({"ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles", method = RequestMethod.POST, headers = "Accept=application/json")
	public Immobile insert(@RequestBody Immobile obj) {
		Immobile result = immobileService.insert(obj);

	    
		
		return result;
	}

	
    //CRUD - REMOVE
    @Secured({"ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
	public void delete(@PathVariable("id") Long id) {
		immobileService.delete(id);
	}
	
	
    //CRUD - GET ONE
    @Secured({"ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles/{id}", method = RequestMethod.GET, headers = "Accept=application/json")
	public Immobile get(@PathVariable Long id) {
		Immobile obj = immobileService.get(id);
		
		
		
		return obj;
	}
	
	
    //CRUD - GET LIST
    @Secured({"ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles", method = RequestMethod.GET, headers = "Accept=application/json")
	public List<Immobile> getList() {
		List<Immobile> list = immobileService.getList();
		return list;
	}
	
	

    //CRUD - EDIT
    @Secured({"ROLE_PRIVATE_USER" })
	@RequestMapping(value = "/immobiles/{id}", method = RequestMethod.POST, headers = "Accept=application/json")
	public Immobile update(@RequestBody Immobile obj, @PathVariable("id") Long id) {
		Immobile result = immobileService.update(obj, id);

	    
		
		return result;
	}
	


/*
 * CUSTOM SERVICES
 * 
 *	These services will be overwritten and implemented in  Custom.js
 */


	
}
