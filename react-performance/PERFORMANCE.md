# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

### Commit duration = Render + Layout effects + Passive effects, 

- **Commit duration**: 586ms
- **Render duration**: 584 ms
- **Screenshot**: ![screenshot](./public/baseline/screen1.png)
- **Screenshot**: ![screenshot](./public/baseline/screen2.png)

**Component:** `CountryList`
- **Commit duration**: 4.6s
- **Render duration**: 84.2 ms
- **Why did this render:** props changed (sortField, onYearChange)

### Interaction B: Search countries

- **Commit duration**: 271.3
- **Render duration**: 270.9 ms
- **Screenshot**: ![screenshot](./public/baseline/screen3.png)
- **Screenshot**: ![screenshot](./public/baseline/screen3.png)

**Component:** `CountryList`
- **Render duration**: 27.7 ms
- **Why did this render:** props changed (searchQuery, onYearChange)

**Component:** `YearSelector`
- **Render duration**: 21.7 ms
- **Why did this render:** props changed (years, onChange)

### Interaction C: Change year

- **Commit duration**: 675,2 ms
- **Render duration**: 675 ms
- **Screenshot**: ![screenshot](./public/baseline/screen5.png)
- **Screenshot**: ![screenshot](./public/baseline/screen6.png)

- **Component:** `CountryList` 
- **Render duration**: 91.2 ms
- **Why did this render:** props changed (selectedYear, onYearChange)

### Interaction D: Toggle column

- **Commit duration**: 627,1
- **Render duration**: 626.9 ms
- **Screenshot**: ![screenshot](./public/baseline/screen7.png)
- **Screenshot**: ![screenshot](./public/baseline/screen8.png)

- **Component:** `CountryList` 
- **Render duration**: 86.2 ms
- **Why did this render:** props changed (years, onChange)

