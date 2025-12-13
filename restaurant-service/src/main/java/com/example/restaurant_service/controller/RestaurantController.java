package com.example.restaurant_service.controller;

import com.example.restaurant_service.entity.Restaurant;
import com.example.restaurant_service.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity <List<Restaurant>> findAll() {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<Restaurant> findByName(@RequestParam String name) {
        return restaurantService.getRestaurantByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Restaurant> create(@RequestBody Restaurant restaurant) {
        Restaurant newRestaurant = restaurantService.saveRestaurant(restaurant);
        return ResponseEntity.ok(newRestaurant);
    }

    @PutMapping
    public ResponseEntity<Restaurant> update(@RequestBody Restaurant restaurant) {
        return restaurantService.updateRestaurant(restaurant)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Restaurant> delete(@PathVariable Long id) {
        return restaurantService.deleteRestaurant(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
