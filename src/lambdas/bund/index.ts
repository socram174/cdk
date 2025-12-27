interface DefaultFunctionConfig {
    runtime: string
    memory: number
    name: string
}

const lambdaConfig: DefaultFunctionConfig = {
    runtime: "NODEJS_22",
    memory: 2048,
    name: "esbuildTest"
}

export const handler = async (event: any) => {
    console.log(lambdaConfig);
    console.log("esbuild test");

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Bund lambda executed successfully with esbuild!",
            config: lambdaConfig
        })
    };
};