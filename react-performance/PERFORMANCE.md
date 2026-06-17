# Performance Optimization Report

### Commit duration = Render + Layout effects + Passive effects,

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 584.2 ms
- **Render duration**: 584 ms
- **Screenshot**: ![screenshot](./public/baseline/screen1.png)
- **Screenshot**: ![screenshot](./public/baseline/screen2.png)

**Component:** `CountryList`
- **Render duration**: 84.2 ms
- **Why did this render:** props changed (sortField, onYearChange)

### Interaction B: Search countries

- **Commit duration**: 271.3 ms
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


## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 43.5 ms
- **Render duration**: 43.3 ms
- **Screenshot**: ![screenshot](./public/optimized/screen9.png)
- **Screenshot**: ![screenshot](./public/optimized/screen10.png)

**Component:** `CountryList`
- **Render duration**: 10.9 ms
- **Why did this render:** props changed (sortField)

### Interaction B: Search countries

- **Commit duration**: 3 ms
- **Render duration**: 2.5 ms
- **Screenshot**: ![screenshot](./public/optimized/screen11.png)
- **Screenshot**: ![screenshot](./public/optimized/screen12.png)

**Component:** `CountryList`
- **Did not client render**

**Component:** `YearSelector`
- **Did not client render**

### Interaction C: Change year

- **Commit duration**: 63.6 ms
- **Render duration**: 63.4 ms
- **Screenshot**: ![screenshot](./public/optimized/screen13.png)
- **Screenshot**: ![screenshot](./public/optimized/screen14.png)

- **Component:** `CountryList` 
- **Render duration**: 9.2 ms
- **Why did this render:** props changed (selectedYear)

### Interaction D: Toggle column

- **Commit duration**: 9.1 ms
- **Render duration**: 8.9 ms
- **Screenshot**: ![screenshot](./public/optimized/screen15.png)
- **Screenshot**: ![screenshot](./public/optimized/screen16.png)

- **Component:** `CountryList` 
- **Did not client render**

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 584.2         | 43.5           | 92.6%       |
| Search countries | 271.3         | 3.0            | 98.9%       |
| Change year      | 675.2         | 63.6           | 90.6%       |
| Toggle column    | 627.1         | 9.1            | 98.5%       |
| **Average**      | **539.5**    | **29.8**        | **94.5%%**  |


# Explanatory Note


To ensure maximum performance, I applied targeted optimization. Mindless wrapping of absolutely all elements in React.memo and useCallback (premature optimization) in React leads to excessive memory consumption for storing references and constant overhead from shallow prop comparisons.


## 1. Why useCallback was omitted for certain functions:

- **handleSortFieldChange** and **handleSortOrderToggle**: these functions are passed directly to native HTML elements (<select> and <button>). Native tags do not have memoization mechanisms, and the stability of reference links does not matter to them. Using useCallback here would run in vain, needlessly putting load on the CPU.
- **handleColumnToggle** and **handleModalToggle**: these are passed to the ColumnModal component. Since the modal component itself is not memoized (reasons specified below), stabilizing the references for these functions is pointless.
- **Note**: I kept useCallback strictly for handleSearch and handleYearChange because they are passed to the memoized controls SearchBar and YearSelector, which are fixed on the screen and must not re-render during text input.


## 2. Why ColumnModal and DataTable were NOT wrapped in React.memo:

Shallow prop comparison is a computational operation itself. Wrapping components with frequently changing data or components that are already protected at the parent level in React.memo is inefficient.
- **ColumnModal**: In its closed state, the component returns null and renders nothing. In its open state, the user clicks checkboxes, and the selectedColumns array is guaranteed to change with every single click. The modal must re-render to display the checkmarks. If I added React.memo, React would waste time checking props on every click, seeing they changed, and triggering the re-render anyway. Memoization would only slow down the process.
- **DataTable**: This component is located inside the CountryCard. I have already wrapped the parent CountryCard in React.memo. If the data for a specific country and the selected year have not changed, CountryCard does not re-render at all. Consequently, the child DataTable inside it is automatically protected from unnecessary re-renders. Adding React.memo to DataTable would create redundant "double memoization".
