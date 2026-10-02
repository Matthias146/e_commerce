package com.spring.ecommerce.dto;

public record AddressResponse(String street,
                              String city,
                              String state,
                              String country,
                              String zipCode) {
}
