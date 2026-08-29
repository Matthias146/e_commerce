package com.spring.ecommerce.config;

import com.spring.ecommerce.entity.Country;
import com.spring.ecommerce.entity.Product;
import com.spring.ecommerce.entity.ProductCategory;
import com.spring.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

	private final EntityManager entityManager;

	@Autowired
	public DataRestConfig(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

		HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

		disableHttpMethods(config.getExposureConfiguration()
				.forDomainType(Product.class), unsupportedActions);

		disableHttpMethods(config.getExposureConfiguration()
				.forDomainType(ProductCategory.class), unsupportedActions);

		disableHttpMethods(config.getExposureConfiguration()
				.forDomainType(Country.class), unsupportedActions);

		disableHttpMethods(config.getExposureConfiguration()
				.forDomainType(State.class), unsupportedActions);

		exposeIds(config);
	}

	private static void disableHttpMethods(ExposureConfigurer config, HttpMethod[] unsupportedActions) {
		config
				.withItemExposure(
						(metadata, httpMethods) ->
								httpMethods.disable(unsupportedActions))
				.withCollectionExposure(
						(metadata, httpMethods) ->
								httpMethods.disable(unsupportedActions));
	}


	private void exposeIds(RepositoryRestConfiguration config) {
		Class<?>[] domainTypes = entityManager
				.getMetamodel()
				.getEntities()
				.stream()
				.map(EntityType::getJavaType)
				.toArray(Class<?>[]::new);

		config.exposeIdsFor(domainTypes);
	}
}
