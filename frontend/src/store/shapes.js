import ShapesService from "@/services/shapes.service";

export default {
    namespaced: true,
    state: {
        shapesData: [] // liste des shapes
    },

    mutations: {
        setShapes(state, shapes) {
            state.shapesData = shapes;
        },

        updatedShape(state, updateShape) {
            const index = state.shapesData.findIndex(shape => shape.shape_id === updateShape.shape_id);
            if (index !== -1) {
                state.shapesData.splice(index, 1, updateShape);
            }
        }
    },

    actions: {
        async getAllShapes({commit}) {
            try {
                const res = await ShapesService.getAllShapes(commit);
                if (res.error === 0) {
                    commit("setShapes", res.data);
                } else {
                    console.log(res);
                }
            } catch (error) {
                console.error('Erreur lors de l’appel au service :', error);
            }
        },

        async updateShape({commit}, updatedShape) {
            const res = await ShapesService.updateShape(updatedShape);
            if (res.error === 0) {
                commit('updatedShape', res.data);
            } else {
                console.error(res);
            }
        },
    },
    getters: {
        getShapes: (state) => {
            return state.shapesData;
        }
    }
}