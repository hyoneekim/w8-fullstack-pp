# 🧾 Property Controller & Test Suite – Self-Assessment Report

## 📁 Files Reviewed
- `controllers/propertyController.js`
- `tests/property_api.test.js`

---

## 🧠 Overview

This project implements a **CRUD API** for managing properties using **Express.js**, **Mongoose**, and **Supertest** for integration testing. The implementation covers all essential RESTful endpoints with corresponding unit/integration tests to verify functionality.

---

## ✅ Functionality Assessment

### **1. GET /api/properties**

**Grade:** 9/10  
**Improvement:** Update `expect(response.body[0].name)` → `expect(response.body[0].title)`.

---

### **2. GET /api/properties/:propertyId**
**Grade:** 10/10  
**Improvement:** None. Implementation and tests are complete and accurate.

---

### **3. POST /api/properties**
**Grade:** 9/10  
**Improvement:**  
- Fix the test property key (`name → title`).  
- Consider adding validation tests for missing required fields.

---

### **4. PUT /api/properties/:propertyId**
**Grade:** 8.5/10  
**Improvement:**  
- Fix variable typo:  
  ```js
  if (updatedProperty) { ... }
  ```
- Add test for non-existing but valid ID (to return 404).

---

### **5. DELETE /api/properties/:propertyId**
**Grade:** 9.5/10  
**Improvement:**  
- No major issues; optionally verify behavior for valid but non-existent IDs.

---
## 🧭 Summary

The CRUD API and its test suite demonstrate solid understanding of Express, Mongoose, and testing best practices. Minor issues such as naming inconsistencies, a small logic typo, and test key mismatches can be fixed easily to reach full marks.

