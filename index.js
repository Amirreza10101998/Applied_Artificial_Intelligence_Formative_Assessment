let capacity = 1500

let weights = [21, 12, 30, 24, 45, 47, 41, 36, 38, 45, 4, 17, 1, 42, 26, 19, 12, 27, 15, 4, 5, 4, 21, 7, 23, 45, 18, 7, 29, 44, 18, 3, 8, 4, 38, 23, 34, 35, 29, 32, 44, 34, 44, 24, 8, 4, 36, 16, 34, 33, 27, 36, 26, 25, 25, 47, 20, 6, 13, 35, 42, 49, 11, 39, 30, 21, 26, 25, 33, 38, 16, 5, 42, 20, 39, 9, 6, 46, 44, 50, 44, 2, 28, 50, 26, 44, 4, 50, 47, 29, 22, 17, 37, 1, 19, 47, 28, 24, 25, 16];

let values = [96, 99, 52, 00, 46, 43, 22, 20, 84, 73, 53, 83, 52, 56, 22, 59, 15, 6, 69, 61, 22, 41, 63, 56, 13, 17, 1, 42, 49, 16, 67, 2, 12, 96, 98, 4, 50, 87, 25, 84, 82, 63, 1, 38, 91, 69, 38, 64, 25, 58, 99, 85, 29, 69, 36, 99, 9, 26, 82, 9, 54, 81, 74, 15, 44, 36, 48, 59, 15, 91, 65, 17, 57, 94, 79, 69, 47, 27, 57, 25, 32, 92, 89, 80, 93, 18, 52, 63, 92, 67, 39, 75, 82, 61, 9, 93, 6, 53, 12, 39];

//Steepest Ascent Hill Climbing:

// Initialize best solution
let steepestAscentHillClimbingBestSolution = [];
for (let i = 0; i < weights.length; i++) {
    steepestAscentHillClimbingBestSolution[i] = 0;
}

// Initialize best value
let bestValue = 0;

// Initialize an array to hold the steepestAscentHillClimbingResults
let steepestAscentHillClimbingResults = [];

// Run the algorithm 10 times
for (let i = 0; i < 10; i++) {
    let currentSolution = [...steepestAscentHillClimbingBestSolution];
    let currentValue = bestValue;

    let iterationCount = 0; // Initialize iteration count

    while (true) {
        let nextSolution = [...currentSolution];
        let nextValue = currentValue;
        let nextWeight = weights.reduce((sum, weight, index) => sum + weight * nextSolution[index], 0);

        // Try to add each item to the knapsack
        for (let j = 0; j < weights.length; j++) {
            if (nextSolution[j] === 0) {
                let tempWeight = nextWeight + weights[j];
                if (tempWeight <= capacity) {
                    let tempValue = nextValue + values[j];
                    if (tempValue > nextValue) {
                        nextSolution[j] = 1;
                        nextValue = tempValue;
                        nextWeight = tempWeight;
                    }
                }
            }
        }

        // If no improvement is made, break the loop
        if (nextValue === currentValue) {
            break;
        } else {
            currentSolution = nextSolution;
            currentValue = nextValue;
        }

        iterationCount++; // Increment iteration count
    }

    // If the new solution is better than the best solution, update the best solution
    if (currentValue > bestValue) {
        steepestAscentHillClimbingBestSolution = currentSolution;
        bestValue = currentValue;
    }

    // Store the steepestAscentHillClimbingResults of this run
    let runResult = {
        Run: i + 1,
        Solution: steepestAscentHillClimbingBestSolution,
        Value: bestValue,
        Iterations: iterationCount
    };

    // Push the result object into the steepestAscentHillClimbingResults array
    steepestAscentHillClimbingResults.push(runResult);
}

// After all runs are finished, print the steepestAscentHillClimbingResults array as a table
console.table(steepestAscentHillClimbingResults);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Simulated Annealing:

// Initialize temperature and cooling rate
let temp = 10000.0;
let coolingRate = 0.003;

// Helper function to calculate the total weight of a solution
function calculateWeight(solution) {
    let weight = 0;
    for (let i = 0; i < solution.length; i++) {
        if (solution[i] === 1) {
            weight += weights[i];
        }
    }
    return weight;
}

// Helper function to calculate the total value of a solution
function calculateValue(solution) {
    let value = 0;
    for (let i = 0; i < solution.length; i++) {
        if (solution[i] === 1) {
            value += values[i];
        }
    }
    return value;
}

// Initialize best solution and current solution randomly
let currentSolution = new Array(weights.length);
let simulatedAnnealingBestSolution = new Array(weights.length);
for (let i = 0; i < weights.length; i++) {
    currentSolution[i] = Math.round(Math.random());
    simulatedAnnealingBestSolution[i] = currentSolution[i];
}

let simulatedAnnealingResults = [];

// Run the algorithm 10 times
for (let i = 0; i < 10; i++) {
    let iterationCount = 0;

    while (temp > 1) {
        // Create new neighbour solution
        let newSolution = [...currentSolution];
        let itemIndex = Math.floor(Math.random() * weights.length); // Item to flip
        newSolution[itemIndex] = newSolution[itemIndex] === 0 ? 1 : 0; // Flip

        // Calculate the values of the current and new solution
        let currentValue = calculateValue(currentSolution);
        let newValue = calculateValue(newSolution);

        // If the new solution is better or makes a good jump according to the probability, accept it
        if ((newValue > currentValue && calculateWeight(newSolution) <= capacity) || (Math.random() <= Math.exp((newValue - currentValue) / temp) && calculateWeight(newSolution) <= capacity)) {
            currentSolution = newSolution;
        }

        // Update the best solution
        if (calculateValue(currentSolution) > calculateValue(simulatedAnnealingBestSolution) && calculateWeight(currentSolution) <= capacity) {
            simulatedAnnealingBestSolution = currentSolution;
        }

        temp *= 1 - coolingRate;
        iterationCount++;
    }

    // Store the simulatedAnnealingResults of this run
    let runResult = {
        Run: i + 1,
        Solution: simulatedAnnealingBestSolution,
        Value: calculateValue(simulatedAnnealingBestSolution),
        Iterations: iterationCount
    };

    // Reset temperature for next run
    temp = 10000.0;

    // Push the result object into the simulatedAnnealingResults array
    simulatedAnnealingResults.push(runResult);
}

console.table(simulatedAnnealingResults);
