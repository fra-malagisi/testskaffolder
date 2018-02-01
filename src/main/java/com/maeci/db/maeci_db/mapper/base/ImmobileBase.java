package com.maeci.db.maeci_db.mapper.base;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.jdbc.core.RowMapper;
import com.maeci.db.maeci_db.mapper.Immobile;

public class ImmobileBase implements RowMapper<Immobile>{
	
	private Long _id;
	
	// Attributes
	private String nome;
	
	
	
	
	
	@Override
	public Immobile mapRow(ResultSet rs, int rowNum) throws SQLException {
		
		Immobile obj = new Immobile();
		try {
			obj.set_id(rs.getLong("id"));
			
			obj.setNome(rs.getString("nome"));
			
        	
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	public Long get_id() {
		return _id;
	}

	public void set_id(Long _id) {
		this._id = _id;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}

	
    
    
    
    
    
}