package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simple-test")
public class TestController {
    
    @GetMapping
    public String test() {
        return "Test controller is working!";
    }
} 